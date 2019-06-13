using RestoRepo.Data;
using RestoRepo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace RestoRepo
{
    public class Repository
    {
        RestoContext ctx;
        List<Product> prods;
        public List<Product> Prods {
            get {
                if (prods == null)
                    prods = ctx.Products.ToList();
                return this.prods;
            }
        }
        
        public Repository(){
            ctx = new RestoContext();
        }

        public List<Product> GetProductsList() {
            return ctx.Products.ToList();
        }

        public List<Order> GetOrders()
        {
            using (var context = new RestoContext())
            {
                List<Order> orders = context.Orders.Include("OrderProducts").ToList();                
                return orders;
            }                        
        }

        public List<Order> GetDeliveredOrders()
        {
            using (var context = new RestoContext())
            {
                List<Order> orders = context.Orders.Include("OrderProducts").Where(x=> x.State.Trim() == orderState.ready.ToString()).ToList();
                return orders;
            }
        }

        public List<ProductsOrderedReport> GetProductsOrderedReport()
        {
            using (var context = new RestoContext())
            {
                List<ProductsOrderedReport> report = new List<ProductsOrderedReport>();
                List<Product> prods = context.Products.ToList();
                foreach (var prod in prods)
                {
                    ProductsOrderedReport row = new ProductsOrderedReport();
                    var orderedProds = context.OrderProducts.Where(x => x.ProductId == prod.ProductID);
                    row.ProductName = prod.ProductName;
                    row.UnitPrice = prod.Price;
                    row.Quantity = orderedProds.Sum(x => x.Quantity);
                    report.Add(row);
                }
                
                return report;
            }
        }

        public bool PlaceAnOrder(List<OrderProducts> OrderProds) {
            int dbchanges = 0;
            Order order = new Order()
            {
                State = orderState.open.ToString(),
                Date = DateTime.Today
            };
            order.OrderProducts = OrderProds;
            ctx.Orders.Add(order);

            dbchanges = ctx.SaveChanges();            

            return dbchanges > 0;
        }
    }
}
