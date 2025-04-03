
export type User = {
  id: string;
  email: string;
  isGuest: boolean;
  provider?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  lastLogin?: Date;
  healthGoals?: string[];
  values?: string[];
  dietaryNeeds?: string[];
  createdAt?: Date;
};
