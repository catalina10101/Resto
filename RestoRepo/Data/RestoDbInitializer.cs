using RestoRepo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestoRepo.Data
{
    public class RestoDbInitializer : DropCreateDatabaseIfModelChanges<RestoContext> // DropCreateDatabaseAlways
    {
        protected override void Seed(RestoContext context)
        {
            base.Seed(context);
            IList<Product> products = GetInitialProducts();
            context.Products.AddRange(products);
            context.SaveChanges();
            IList<Order> orders = GetInitialOrders();
            context.Orders.AddRange(orders);
            context.SaveChanges();            
        }

        IList<Product> GetInitialProducts() {
            IList<Product> products = new List<Product>();

            products.Add(new Product() { ProductName = "burguer", Price = 10 });
            products.Add(new Product() { ProductName = "hot dog", Price = 7 });
            products.Add(new Product() { ProductName = "pizza", Price = 5 });
            products.Add(new Product() { ProductName = "coke", Price = 2 });
            return products;
        }

        IList<Order> GetInitialOrders()
        {
            IList<Order> orders = new List<Order>();
            OrderProducts burguer = new OrderProducts() { ProductId= 1, Quantity= 1 };
            OrderProducts TwoPizzas = new OrderProducts() { ProductId = 3, Quantity = 2 };
            OrderProducts coke = new OrderProducts() { ProductId = 4, Quantity = 1 };
            OrderProducts hotDog = new OrderProducts() { ProductId = 2, Quantity = 1 };

            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.open,
                OrderProducts = new List<OrderProducts>() { TwoPizzas, coke } });
            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.open,
                OrderProducts = new List<OrderProducts>() { burguer } });
            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.open,
                OrderProducts = new List<OrderProducts>() { hotDog } });

            OrderProducts burguer2 = new OrderProducts() { ProductId = 1, Quantity = 2 };
            OrderProducts pizza = new OrderProducts() { ProductId = 3, Quantity = 1 };
            OrderProducts coke2 = new OrderProducts() { ProductId = 4, Quantity = 1 };
            OrderProducts hotDog2 = new OrderProducts() { ProductId = 2, Quantity = 1 };

            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.inProgress,
                OrderProducts = new List<OrderProducts>() { burguer2, coke } });
            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.inProgress,
                OrderProducts = new List<OrderProducts>() { pizza } });
            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.inProgress,
                OrderProducts = new List<OrderProducts>() { hotDog2 } });
            
            OrderProducts pizza3 = new OrderProducts() { ProductId = 3, Quantity = 1 };
            OrderProducts coke3 = new OrderProducts() { ProductId = 4, Quantity = 1 };
            OrderProducts hotDog3 = new OrderProducts() { ProductId = 2, Quantity = 1 };

            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.delivered,
                OrderProducts = new List<OrderProducts>() { pizza3 } });
            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.delivered,
                OrderProducts = new List<OrderProducts>() { coke3 } });
            orders.Add(new Order() { Date= DateTime.Today, StateID = (int) orderState.delivered,
                OrderProducts = new List<OrderProducts>() { hotDog3 } });
            return orders;
        }
    }
}
