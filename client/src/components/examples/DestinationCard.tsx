import DestinationCard from '../DestinationCard';
import heroImage from '@assets/generated_images/Caribbean_coral_bay_vista_c7919f1e.png';

export default function DestinationCardExample() {
  return (
    <div className="p-8 bg-background">
      <DestinationCard 
        id="coral-bay"
        name="Coral Bay"
        location="Palma Vista in the Caribbean"
        image={heroImage}
        index={0}
      />
    </div>
  );
}
