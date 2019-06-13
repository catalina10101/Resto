using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestoRepo.Data
{
    public class OrderProducts
    {
        Repository repo;

        public OrderProducts()
        {
            repo = new Repository();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderProductsID { get; set; }
        public int ProductId { get; set; }
        public Product product {
            get {
                return repo.Prods.Where(p => p.ProductID == this.ProductId).FirstOrDefault();
            }
        }
        public int Quantity { get; set; }

    }
}
