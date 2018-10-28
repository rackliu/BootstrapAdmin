﻿using Longbow.Cache;
using Longbow.Data;
using System.Collections.Generic;
using System.Linq;

namespace Bootstrap.DataAccess
{
    /// <summary>
    /// 
    /// </summary>
    public static class MessageHelper
    {
        /// <summary>
        /// 
        /// </summary>
        public const string RetrieveMessageDataKey = "MessageHelper-RetrieveMessages";
        /// <summary>
        /// 收件箱
        /// </summary>
        /// <param name="userName"></param>
        public static IEnumerable<Message> Inbox(string userName) => DbAdapterManager.Create<Message>().Inbox(userName);
        /// <summary>
        /// 发件箱
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<Message> SendMail(string userName) => DbAdapterManager.Create<Message>().SendMail(userName);
        /// <summary>
        /// 垃圾箱
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<Message> Trash(string userName) => DbAdapterManager.Create<Message>().Trash(userName);
        /// <summary>
        /// 标旗
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<Message> Mark(string userName) => DbAdapterManager.Create<Message>().Flag(userName);
        /// <summary>
        /// 获取Header处显示的消息列表
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<Message> RetrieveMessagesHeader(string userName) => CacheManager.GetOrAdd(RetrieveMessageDataKey, key => DbAdapterManager.Create<Message>().RetrieveMessagesHeader(userName).OrderByDescending(n => n.SendTime));
    }
}