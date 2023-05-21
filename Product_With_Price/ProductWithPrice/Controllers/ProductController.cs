using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ProductWithPrice.Models;

namespace ProductWithPrice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class ProductController : Controller
    {
        private ProductServiceImp _productServiceImp;
        public ProductController(ProductServiceImp productServiceImp)
        {
            _productServiceImp = productServiceImp;
        }

        // GET: api/Product/all
        [HttpGet("all", Name = "GetAllProducts")]
        public IActionResult  Index() 
        {
            var products = _productServiceImp.GetAll();
            return Ok(products);
        }
        // PUT: api/Product/{id}
        [HttpPut("{id}", Name = "UpdateProduct")]
        public IActionResult Update(int id, [FromBody] Product product)
        {
            _productServiceImp.Update(product);
            return RedirectToAction("Index");
        }
        // DELETE: api/Product/{id}
        [HttpDelete("{id}" ,Name = "DeleteProduct")]
        public IActionResult Delete(int id )
        {
            _productServiceImp.Delete(id);
            return Ok();
        }

        //POST: api/Product
        [HttpPost("", Name ="AddProduct")]
        public IActionResult Post([FromBody] Product product) 
        {
            _productServiceImp.Add(product);
            return RedirectToAction("Index");   
        }

    }
}
