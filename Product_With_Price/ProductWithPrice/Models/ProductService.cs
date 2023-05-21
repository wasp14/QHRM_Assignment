namespace ProductWithPrice.Models
{
    public interface ProductService
    {
         void Add(Product product);

         void Update(Product product);

         void Delete(int id);    

         IEnumerable<Product> GetAll();

         Product GetById(int id);

        
    }
}
