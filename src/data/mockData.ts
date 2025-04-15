export interface Driver {
  id: string;
  name: string;
  rating: number;
  photo: string;
  carModel: string;
  carImage: string;
  licensePlate: string;
  distance: number; // en mètres
  eta: number; // en minutes
}

export interface Trip {
  id: string;
  date: Date;
  from: string;
  to: string;
  price: number;
  duration: number; // en minutes
  distance: number; // en km
  driverId: string;
  status: 'completed' | 'cancelled' | 'scheduled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  favoriteLocations: { id: string; name: string; address: string }[];
  paymentMethods: { id: string; type: string; lastFour: string }[];
}

// Données mockées pour les chauffeurs à proximité
export const nearbyDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'Thomas Durand',
    rating: 4.8,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    carModel: 'Tesla Model 3',
    carImage: 'https://images.unsplash.com/photo-1617788138017-80ad244c2b9a?q=80&w=300&auto=format',
    licensePlate: 'AB-123-CD',
    distance: 350,
    eta: 3
  },
  {
    id: 'd2',
    name: 'Sophie Martin',
    rating: 4.9,
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    carModel: 'Mercedes Classe E',
    carImage: 'https://images.unsplash.com/photo-1508171997656-fdf7cf6c4df9?q=80&w=300&auto=format',
    licensePlate: 'EF-456-GH',
    distance: 650,
    eta: 5
  },
  {
    id: 'd3',
    name: 'Antoine Leblanc',
    rating: 4.7,
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    carModel: 'BMW i4',
    carImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=300&auto=format',
    licensePlate: 'IJ-789-KL',
    distance: 1200,
    eta: 8
  }
];

// Données mockées pour l'historique des trajets
export const tripHistory: Trip[] = [
  {
    id: 't1',
    date: new Date(2025, 3, 10, 14, 30),
    from: '12 Rue de Rivoli, Paris',
    to: 'Gare de Lyon, Paris',
    price: 18.50,
    duration: 25,
    distance: 5.2,
    driverId: 'd1',
    status: 'completed'
  },
  {
    id: 't2',
    date: new Date(2025, 3, 5, 9, 15),
    from: '8 Avenue des Champs-Élysées, Paris',
    to: 'Tour Eiffel, Paris',
    price: 22.30,
    duration: 30,
    distance: 6.5,
    driverId: 'd2',
    status: 'completed'
  },
  {
    id: 't3',
    date: new Date(2025, 3, 15, 18, 0),
    from: '25 Boulevard Haussmann, Paris',
    to: 'Aéroport Charles de Gaulle, Paris',
    price: 48.75,
    duration: 45,
    distance: 28.3,
    driverId: 'd3',
    status: 'scheduled'
  }
];

// Données mockées pour l'utilisateur actuel
export const currentUser: User = {
  id: 'u1',
  name: 'Marie Dupont',
  email: 'marie.dupont@example.com',
  phone: '06 12 34 56 78',
  profilePicture: 'https://randomuser.me/api/portraits/women/22.jpg',
  favoriteLocations: [
    { id: 'f1', name: 'Maison', address: '42 Rue du Faubourg Saint-Honoré, Paris' },
    { id: 'f2', name: 'Bureau', address: '1 Place de la Concorde, Paris' },
    { id: 'f3', name: 'Gym', address: '15 Rue de la Paix, Paris' }
  ],
  paymentMethods: [
    { id: 'p1', type: 'Visa', lastFour: '4242' },
    { id: 'p2', type: 'Mastercard', lastFour: '1234' }
  ]
};

// Points d'intérêt populaires pour les suggestions
export const popularPlaces = [
  { id: 'pp1', name: 'Tour Eiffel', address: 'Champ de Mars, 5 Av. Anatole France, Paris' },
  { id: 'pp2', name: 'Louvre', address: 'Rue de Rivoli, 75001 Paris' },
  { id: 'pp3', name: 'Notre-Dame', address: '6 Parvis Notre-Dame, 75004 Paris' },
  { id: 'pp4', name: 'Arc de Triomphe', address: 'Place Charles de Gaulle, 75008 Paris' }
];

// Options de véhicules disponibles
export const vehicleOptions = [
  { id: 'v1', type: 'Standard', price: 1.0, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=200&auto=format', eta: '3-5 min' },
  { id: 'v2', type: 'Confort', price: 1.5, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=200&auto=format', eta: '4-7 min' },
  { id: 'v3', type: 'Premium', price: 2.0, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=200&auto=format', eta: '5-8 min' },
  { id: 'v4', type: 'Van', price: 2.2, image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=200&auto=format', eta: '7-10 min' },
];
