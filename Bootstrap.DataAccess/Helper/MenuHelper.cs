﻿using Bootstrap.Security;
using Longbow.Cache;
using Longbow.Data;
using System.Collections.Generic;

namespace Bootstrap.DataAccess
{
    /// <summary>
    /// 
    /// </summary>
    public static class MenuHelper
    {
        /// <summary>
        /// 
        /// </summary>
        public const string RetrieveMenusByRoleIdDataKey = "MenuHelper-RetrieveMenusByRoleId";
        /// <summary>
        /// 
        /// </summary>
        public const string RetrieveMenusDataKey = "BootstrapMenu-RetrieveMenusByUserName";
        /// <summary>
        /// 
        /// </summary>
        public const string RetrieveMenusAll = "BootstrapMenu-RetrieveMenus";
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool SaveMenu(BootstrapMenu value) => DbAdapterManager.Create<Menu>().SaveMenu(value);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool DeleteMenu(IEnumerable<int> value) => DbAdapterManager.Create<Menu>().DeleteMenu(value);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveMenusByUserName(string userName) => DbAdapterManager.Create<Menu>().RetrieveMenusByUserName(userName);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveMenusByRoleId(int roleId)
        {
            return CacheManager.GetOrAdd($"{RetrieveMenusByRoleIdDataKey}-{roleId}", k => DbAdapterManager.Create<Menu>().RetrieveMenusByRoleId(roleId), RetrieveMenusByRoleIdDataKey);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool SaveMenusByRoleId(int id, IEnumerable<int> value) => DbAdapterManager.Create<Menu>().SaveMenusByRoleId(id, value);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="url"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveAppMenus(string appId, string userName, string url) => DbAdapterManager.Create<Menu>().RetrieveAppMenus(appId, userName, url);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="activeUrl"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveSystemMenus(string userName, string activeUrl = null) => DbAdapterManager.Create<Menu>().RetrieveSystemMenus(userName, activeUrl);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveAllMenus(string name) => DbAdapterManager.Create<Menu>().RetrieveAllMenus(name);
    }
}