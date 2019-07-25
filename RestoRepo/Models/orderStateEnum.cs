using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestoRepo.Models
{
    public enum orderState
    {
        [Description("Open")]
        open = 1,
        [Description("In Progress")]
        inProgress = 2,
        [Description("Delivered")]
        delivered = 3
    }
}
