// Feedback type
export interface Feedback {
  id: string;
  type: 'request' | 'issue' | 'suggestion';
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
  status: 'pending' | 'read' | 'resolved';
}