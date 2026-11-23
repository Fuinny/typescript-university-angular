import { Contact } from './contact';

export interface Client {
  id: string,
  company_name: string;
  company_code: string | null;
  vat_reg_number: string | null;
  address: string | null;
  email: string;
  telephone: string | null;
  contacts: Contact[];
}
