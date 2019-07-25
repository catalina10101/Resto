using RestoRepo.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestoRepo.Data
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; }
        public int StateID { get; set; }
        public string State { get { return EnumTool.DescriptionAttr<orderState>((orderState)this.StateID); } }
        public DateTime Date { get; set; }

        public virtual List<OrderProducts> OrderProducts { get; set; }
    }
}
