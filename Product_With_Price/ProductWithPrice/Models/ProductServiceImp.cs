using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
namespace ProductWithPrice.Models
{
    public class ProductServiceImp : ProductService
    {
        private readonly SqlConnection connection;
        public ProductServiceImp(IConfiguration configuration)
        {
           

            connection = new SqlConnection(configuration.GetConnectionString("DefaultString"));
        }

        public void Add(Product product)
        {
            

            connection.Execute("AddProduct", product, commandType: CommandType.StoredProcedure);

        }

        public void Update(Product product)
        {
            connection.Execute("UpdateById", product, commandType: CommandType.StoredProcedure);
        }

        public void Delete(int id) 
        {
            connection.Execute("DeleteById", new { Id = id }, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<Product> GetAll()
        {
            return connection.Query<Product>("GetAllProduct", commandType: CommandType.StoredProcedure);
        }

        public Product GetById(int id)
        {
            return connection.QuerySingleOrDefault<Product>("GetProductById", new { Id = id }, commandType: CommandType.StoredProcedure);
        }

    }
}
