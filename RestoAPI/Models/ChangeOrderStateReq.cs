using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestoAPI.Models
{
    public class ChangeOrderStateReq
    {
        public int orderID {get; set;}
        public bool setNext { get; set; }
    }
}