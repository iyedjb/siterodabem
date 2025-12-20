import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <div className="h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-4">
        <p className="text-muted-foreground">Navigation component mounted above</p>
      </div>
    </div>
  );
}
