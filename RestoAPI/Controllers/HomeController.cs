using RestoRepo;
using RestoRepo.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Web.Http.Cors;

namespace RestoAPI.Controllers
{
    //[AllowCrossSiteJson]
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class HomeController : ApiController
    {
        Repository repo;

        public HomeController() {
            repo = new Repository();
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult Home()
        {
            return Ok("Hi there :D");
        }

        [HttpPost]
        [Route("api/PlaceAnOrder")]
        public bool PlaceAnOrder(List<OrderProducts> OrderProds)
        {
            return repo.PlaceAnOrder(OrderProds); 
        }

        [HttpGet]
        [Route("api/Orders")]
        public IHttpActionResult Orders()
        {
            try
            {
                var orders = repo.GetOrders();
                return Ok(orders);
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }            
        }

        [HttpGet]       
        [Route("api/Products")]        
        public IHttpActionResult GetProductsList()
        {
            try
            {
                var prods = repo.GetProductsList();
                return Ok(prods);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("api/GetDeliveredOrders")]
        public IHttpActionResult GetDeliveredOrders()
        {
            try
            {
                var orders = repo.GetDeliveredOrders();
                return Ok(orders);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetProductsOrderedReport")]
        public IHttpActionResult GetProductsOrderedReport()
        {
            try
            {
                var report = repo.GetProductsOrderedReport();
                return Ok(report);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
