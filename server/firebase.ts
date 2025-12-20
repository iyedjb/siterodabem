import admin from 'firebase-admin';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  highlights: string[];
  bestTime: string;
  climate: string;
  price?: number;
  duration?: string;
  includedServices?: string[];
  availableSpots?: number;
}

interface Booking {
  id: string;
  customerName: string;
  destinationId: string;
  packageId?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingDate: string;
  travelDate: string;
  numberOfPeople: number;
  totalPrice: number;
  paymentStatus?: string;
  specialRequests?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferences?: string[];
  bookingHistory?: string[];
}

interface Package {
  id: string;
  name: string;
  destinationId: string;
  description: string;
  price: number;
  duration: string;
  included: string[];
  maxPeople: number;
  availableSpots?: number;
}

interface Testimonial {
  id: string;
  customerName: string;
  destinationId?: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface AllFirebaseData {
  destinations: Destination[];
  bookings: Booking[];
  customers: Customer[];
  packages: Package[];
  testimonials: Testimonial[];
  customData: Record<string, any>;
}

class FirebaseService {
  private db: admin.database.Database | null = null;
  private destinationsCache: Destination[] = [];
  private bookingsCache: Booking[] = [];
  private customersCache: Customer[] = [];
  private packagesCache: Package[] = [];
  private testimonialsCache: Testimonial[] = [];
  private customDataCache: Record<string, any> = {};
  private lastCacheUpdate: number = 0;
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async initialize() {
    if (admin.apps.length === 0) {
      try {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
          ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
          : null;
        
        const databaseURL = process.env.FIREBASE_DATABASE_URL;

        if (!serviceAccount || !databaseURL) {
          console.warn('Firebase credentials not configured. Chatbot will work with limited data.');
          return;
        }

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: databaseURL
        });

        this.db = admin.database();
        console.log('Firebase initialized successfully');
        
        // Warm up cache on startup - await to ensure data is loaded
        await this.refreshDestinationsCache();
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
      }
    } else {
      this.db = admin.database();
    }
  }

  async refreshAllCaches(): Promise<void> {
    if (!this.db) return;

    try {
      // Fetch all data nodes in parallel for better performance
      const [destinationsSnap, bookingsSnap, customersSnap, packagesSnap, testimonialsSnap, rootSnap] = await Promise.all([
        this.db.ref('destinations').once('value'),
        this.db.ref('bookings').once('value'),
        this.db.ref('customers').once('value'),
        this.db.ref('packages').once('value'),
        this.db.ref('testimonials').once('value'),
        this.db.ref('/').once('value')
      ]);

      // Process destinations - reset cache first to handle deletions
      const destinationsData = destinationsSnap.val();
      this.destinationsCache = destinationsData 
        ? Object.keys(destinationsData).map(id => ({ id, ...destinationsData[id] }))
        : [];

      // Process bookings - reset cache first to handle deletions
      const bookingsData = bookingsSnap.val();
      this.bookingsCache = bookingsData
        ? Object.keys(bookingsData).map(id => ({ id, ...bookingsData[id] }))
        : [];

      // Process customers - reset cache first to handle deletions
      const customersData = customersSnap.val();
      this.customersCache = customersData
        ? Object.keys(customersData).map(id => ({ id, ...customersData[id] }))
        : [];

      // Process packages - reset cache first to handle deletions
      const packagesData = packagesSnap.val();
      this.packagesCache = packagesData
        ? Object.keys(packagesData).map(id => ({ id, ...packagesData[id] }))
        : [];

      // Process testimonials - reset cache first to handle deletions
      const testimonialsData = testimonialsSnap.val();
      this.testimonialsCache = testimonialsData
        ? Object.keys(testimonialsData).map(id => ({ id, ...testimonialsData[id] }))
        : [];

      // Store any additional custom data from root - reset to handle deletions
      const rootData = rootSnap.val();
      this.customDataCache = rootData ? { ...rootData } : {};

      this.lastCacheUpdate = Date.now();
      console.log(`📊 Firebase data loaded: ${this.destinationsCache.length} destinations, ${this.bookingsCache.length} bookings, ${this.customersCache.length} customers, ${this.packagesCache.length} packages, ${this.testimonialsCache.length} testimonials`);
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  }

  async refreshDestinationsCache(): Promise<void> {
    await this.refreshAllCaches();
  }

  async refreshCacheIfNeeded(): Promise<void> {
    if (Date.now() - this.lastCacheUpdate > this.CACHE_TTL) {
      await this.refreshAllCaches();
    }
  }

  async getDestinations(): Promise<Destination[]> {
    await this.refreshCacheIfNeeded();
    return this.destinationsCache;
  }

  async getBookings(): Promise<Booking[]> {
    await this.refreshCacheIfNeeded();
    return this.bookingsCache;
  }

  async getCustomers(): Promise<Customer[]> {
    await this.refreshCacheIfNeeded();
    return this.customersCache;
  }

  async getPackages(): Promise<Package[]> {
    await this.refreshCacheIfNeeded();
    return this.packagesCache;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    await this.refreshCacheIfNeeded();
    return this.testimonialsCache;
  }

  async getAllData(): Promise<AllFirebaseData> {
    await this.refreshCacheIfNeeded();
    return {
      destinations: this.destinationsCache,
      bookings: this.bookingsCache,
      customers: this.customersCache,
      packages: this.packagesCache,
      testimonials: this.testimonialsCache,
      customData: this.customDataCache
    };
  }

  async getDestinationById(id: string): Promise<Destination | null> {
    const destinations = await this.getDestinations();
    return destinations.find(d => d.id === id) || null;
  }

  async getDestinationsSummary(): Promise<string> {
    const destinations = await this.getDestinations();
    
    if (destinations.length === 0) {
      return 'Nenhum destino disponível no momento.';
    }

    return destinations.map(dest => {
      const parts = [
        `**${dest.name}** (${dest.location})`,
        dest.availableSpots !== undefined ? `Vagas: ${dest.availableSpots}` : null,
        dest.price ? `Preço: R$ ${dest.price}` : null,
        dest.duration ? `Duração: ${dest.duration}` : null,
        dest.bestTime ? `Melhor época: ${dest.bestTime}` : null,
        dest.highlights?.length > 0 ? `Destaques: ${dest.highlights.slice(0, 3).join(', ')}` : null
      ].filter(Boolean);
      
      return parts.join(' | ');
    }).join('\n\n');
  }

  async getComprehensiveDataSummary(): Promise<string> {
    const allData = await this.getAllData();
    
    let summary = '';

    // Destinations summary - clear and concise
    if (allData.destinations.length > 0) {
      summary += '=== DESTINOS ===\n';
      summary += allData.destinations.map(dest => {
        let line = `${dest.name}`;
        if (dest.price) line += ` - R$ ${dest.price}`;
        if (dest.availableSpots !== undefined) line += ` - ${dest.availableSpots} vagas`;
        if (dest.duration) line += ` - ${dest.duration}`;
        return line;
      }).join('\n');
      summary += '\n\n';
    }

    // Packages summary
    if (allData.packages.length > 0) {
      summary += '=== PACOTES DISPONÍVEIS ===\n';
      summary += allData.packages.map(pkg => {
        const spots = pkg.availableSpots !== undefined ? pkg.availableSpots : pkg.maxPeople;
        return `${pkg.name} - R$ ${pkg.price} (${pkg.duration}) - ${spots} vagas`;
      }).join('\n');
      summary += '\n\n';
    }

    // Recent bookings stats
    if (allData.bookings.length > 0) {
      const confirmedBookings = allData.bookings.filter(b => b.status === 'confirmed').length;
      const pendingBookings = allData.bookings.filter(b => b.status === 'pending').length;
      summary += `=== ESTATÍSTICAS DE RESERVAS ===\n`;
      summary += `Total de reservas: ${allData.bookings.length}\n`;
      summary += `Confirmadas: ${confirmedBookings}\n`;
      summary += `Pendentes: ${pendingBookings}\n\n`;
    }

    // Testimonials summary
    if (allData.testimonials.length > 0) {
      const avgRating = allData.testimonials.reduce((sum, t) => sum + t.rating, 0) / allData.testimonials.length;
      summary += `=== AVALIAÇÕES ===\n`;
      summary += `Total de avaliações: ${allData.testimonials.length}\n`;
      summary += `Avaliação média: ${avgRating.toFixed(1)}/5\n`;
      const recentTestimonials = allData.testimonials.slice(-3);
      if (recentTestimonials.length > 0) {
        summary += 'Avaliações recentes:\n';
        recentTestimonials.forEach(t => {
          summary += `- ${t.customerName}: ${t.rating}/5 - "${t.comment.substring(0, 100)}${t.comment.length > 100 ? '...' : ''}"\n`;
        });
      }
      summary += '\n';
    }

    // Customer count
    if (allData.customers.length > 0) {
      summary += `=== CLIENTES ===\n`;
      summary += `Total de clientes cadastrados: ${allData.customers.length}\n\n`;
    }

    // Custom data summary
    const relevantCustomKeys = Object.keys(allData.customData).filter(
      key => !['destinations', 'bookings', 'customers', 'packages', 'testimonials'].includes(key)
    );
    if (relevantCustomKeys.length > 0) {
      summary += `=== DADOS ADICIONAIS ===\n`;
      relevantCustomKeys.forEach(key => {
        summary += `${key}: ${JSON.stringify(allData.customData[key]).substring(0, 200)}\n`;
      });
    }

    return summary.trim() || 'Nenhum dado disponível no momento.';
  }
}

export const firebaseService = new FirebaseService();
