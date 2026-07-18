import { pool } from "../../config/db.js";


class CompanyRepository {
  async createCompany(name,description,logo_url,company_size,email,phone_number,city,state,country ,location,website) {
  
      const result = await pool.query(
        `INSERT INTO company (name,description,logo_url,company_size,email,phone_number,city,state,country,location,website)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *`,
      [name,description,logo_url,company_size,email,phone_number,city,state,country,location,website]
      );
      return result.rows[0];
    };

    async getCompanyById(companyId) {
      const result = await pool.query(
        `SELECT *
         FROM company
         WHERE company_id = $1
         AND is_active = TRUE`,
        [companyId],
      );
  
      return result.rows[0];
    
    }
    async getAllCompanies() {
      const result = await pool.query(
        `SELECT *
         FROM company
               AND is_active = TRUE`,

      );
  
      return result.rows; 
    } 
    async updateCompany(companyId,name,description,logo_url,company_size,email,phone_number,city,state,country ,location,website) {
    const result = await pool.query(
      `UPDATE company
      SET name = $1,
      description = $2,
      logo_url = $3,
      company_size = $4,
      email = $5,
      phone_number = $6,
      city = $7,
      state = $8,
      country = $9,
      location = $10,
      website = $11
      WHERE company_id = $12
      RETURNING *`,
      [name,description,logo_url,company_size,email,phone_number,city,state,country,location,website,companyId]);
      return result.rows[0];

    }
    
    async deleteCompany(companyId) {
      const result = await pool.query(
        `UPDATE company
         SET is_active = FALSE
         WHERE company_id = $1
         RETURNING *`,
        [companyId],
      );
  
      return result.rows[0];
    }

    async getCompanyByEmail(email){
      const result = await pool.query(
        `SELECT *
         FROM company
         WHERE email = $1
         AND is_active = TRUE`,
        [email],
      );
  
      return result.rows[0];

    };
    




  }



