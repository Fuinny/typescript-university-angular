import { inject, Service } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Service()
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly apiURL = 'https://crm-system-efeae-default-rtdb.europe-west1.firebasedatabase.app/crm';

  public addClient(client: Client) {
    return this.http.post(this.apiURL + ".json", client);
  }

  public loadClients() {
    return this.http.get<{ [key: string]: Client }>(this.apiURL + ".json").pipe(
      map((data) => {
        const result: Client[] = [];

        for (let id in data) {
          result.push({
            id: id,
            company_name: data[id].company_name,
            company_code: data[id].company_code,
            vat_reg_number: data[id].vat_reg_number,
            address: data[id].address,
            email: data[id].email,
            telephone: data[id].telephone,
            contacts: data[id].contacts
          });
        }

        return result;
      })
    )
  }
}
