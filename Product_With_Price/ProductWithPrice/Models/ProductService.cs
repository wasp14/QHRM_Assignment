namespace ProductWithPrice.Models
{
    public interface ProductService
    {
         void Add(Product product);

         void Update(Product product);

         void Delete(Product product);    

         IEnumerable<Product> GetAll();

         Product GetById(int id);

        
    }
}
