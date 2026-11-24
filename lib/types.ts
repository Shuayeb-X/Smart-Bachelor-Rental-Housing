export type Role = 'renter' | 'owner' | 'admin'
export type Category = 'single_room' | 'shared_room' | 'flat' | 'sublet'
export type House = {
  id: string
  owner_id: string
  title: string
  description: string
  price: number
  location: string
  latitude: number | null
  longitude: number | null
  category: Category
  amenities: string[]
  images: string[]
  status: 'pending' | 'approved' | 'rejected'
  is_available: boolean
  created_at: string
}
export type Profile = { id: string; name: string; email: string; phone: string | null; role: Role }
export const categoryLabels: Record<Category, string> = { single_room: 'Single room', shared_room: 'Shared room', flat: 'Full flat', sublet: 'Sublet' }
export const amenityOptions = ['wifi', 'ac', 'water', 'electricity', 'parking', 'kitchen', 'bed'] as const
export const formatBDT = (amount: number) => `BDT ${new Intl.NumberFormat('en-BD').format(amount)}`
