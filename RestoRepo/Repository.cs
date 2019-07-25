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
                List<Order> orders = context.Orders.Include("OrderProducts").Where(x=> x.StateID ==  (int)orderState.delivered).ToList();
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
                StateID = (int)orderState.open,
                Date = DateTime.Today
            };
            order.OrderProducts = OrderProds;
            ctx.Orders.Add(order);

            dbchanges = ctx.SaveChanges();            

            return dbchanges > 0;
        }

        public orderState ChangeState(int orderID, bool setNext) {
            using (var context = new RestoContext())
            {
                Order order = context.Orders.SingleOrDefault(x => x.OrderID == orderID);
                int  currentState = order.StateID;// (orderState)Enum.Parse(typeof(orderState), order.State);
                orderState newState;

                if (setNext && (int)currentState == Enum.GetValues(typeof(orderState)).Length)
                    newState = (orderState)currentState;
                else if (!setNext && (int)currentState == 1)
                    newState = (orderState)currentState;
                else if (setNext)
                    newState = (orderState)(((int)currentState) + 1);
                else
                    newState = (orderState)(((int)currentState) - 1);

                order.StateID = (int)newState;
                context.SaveChanges();
                return newState;
            }
        }

    }
}
