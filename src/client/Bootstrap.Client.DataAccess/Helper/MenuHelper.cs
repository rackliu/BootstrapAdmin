﻿using Bootstrap.Security;
using Bootstrap.Security.DataAccess;
using Bootstrap.Security.Mvc;
using Longbow.Cache;
using Longbow.Data;
using System.Collections.Generic;
using System.Linq;

namespace Bootstrap.Client.DataAccess
{
    /// <summary>
    /// 菜单操作类
    /// </summary>
    public static class MenuHelper
    {
        /// <summary>
        /// 通过当前用户获取所有菜单数据缓存键名称 "BootstrapMenu-RetrieveMenus"
        /// </summary>
        public const string RetrieveMenusAll = DbHelper.RetrieveMenusAll;

        /// <summary>
        /// 获取指定用户的应用程序菜单
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="activeUrl"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveAppMenus(string userName, string activeUrl)
        {
            var appId = BootstrapAppContext.AppId;
            var menus = RetrieveAllMenus(userName).Where(m => m.Category == "1" && m.IsResource == 0 && m.Application == appId);
            return DbHelper.CascadeMenus(menus, activeUrl);
        }

        /// <summary>
        /// 通过用户获得所有菜单
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapMenu> RetrieveAllMenus(string userName) => CacheManager.GetOrAdd($"{RetrieveMenusAll}-{userName}", key => DbContextManager.Create<Menu>()?.RetrieveAllMenus(userName), RetrieveMenusAll) ?? new BootstrapMenu[0];
    }
}
