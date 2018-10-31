﻿using Bootstrap.DataAccess;
using Longbow.Web.Mvc;
using System.Linq;

namespace Bootstrap.Admin.Query
{
    /// <summary>
    /// 
    /// </summary>
    public class QueryMenuOption : PaginationOption
    {
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ParentName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Category { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsResource { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public QueryData<object> RetrieveData(string userName)
        {
            var data = MenuHelper.RetrieveMenusByUserName(userName);
            if (!string.IsNullOrEmpty(ParentName))
            {
                data = data.Where(t => t.ParentName.Contains(ParentName));
            }
            if (!string.IsNullOrEmpty(Name))
            {
                data = data.Where(t => t.Name.Contains(Name));
            }
            if (!string.IsNullOrEmpty(Category))
            {
                data = data.Where(t => t.Category.Contains(Category));
            }
            if (!string.IsNullOrEmpty(IsResource))
            {
                data = data.Where(t => t.IsResource.ToString() == IsResource);
            }
            var ret = new QueryData<object>();
            ret.total = data.Count();
            switch (Sort)
            {
                case "Name":
                    data = Order == "asc" ? data.OrderBy(t => t.Name) : data.OrderByDescending(t => t.Name);
                    break;
                case "ParentName":
                    data = Order == "asc" ? data.OrderBy(t => t.ParentName) : data.OrderByDescending(t => t.ParentName);
                    break;
                case "Order":
                    data = Order == "asc" ? data.OrderBy(t => t.Order) : data.OrderByDescending(t => t.Order);
                    break;
                case "CategoryName":
                    data = Order == "asc" ? data.OrderBy(t => t.CategoryName) : data.OrderByDescending(t => t.CategoryName);
                    break;
                case "Target":
                    data = Order == "asc" ? data.OrderBy(t => t.Target) : data.OrderByDescending(t => t.Target);
                    break;
                case "IsResource":
                    data = Order == "asc" ? data.OrderBy(t => t.IsResource) : data.OrderByDescending(t => t.IsResource);
                    break;
                case "ApplicationCode":
                    data = Order == "asc" ? data.OrderBy(t => t.ApplicationCode) : data.OrderByDescending(t => t.ApplicationCode);
                    break;
                default:
                    break;
            }
            ret.rows = data.Skip(Offset).Take(Limit).Select(p => new
            {
                p.Id,
                p.ParentId,
                p.ParentName,
                p.Name,
                p.Order,
                p.Icon,
                p.Url,
                p.Category,
                p.CategoryName,
                p.Target,
                p.IsResource,
                p.ApplicationCode
            });
            return ret;
        }
    }
}