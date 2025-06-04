import { Star, MapPin, FileText } from 'lucide-react';

export const profileLinkSections = [
  {
    title: 'ACCOUNT',
    items: [
      { icon: Star, label: 'My Reviews', path: '/my-reviews' },
      { icon: MapPin, label: 'Saved Places', path: '/saved-places' }
    ]
  },
  {
    title: 'DOCUMENTATION',
    items: [
      { icon: FileText, label: 'Documentation', path: '/docs' }
    ]
  }
];