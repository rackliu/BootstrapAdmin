USE [BootstrapAdmin]
GO
/* added by argo the default password is 123789 */
insert into Users (UserName, Password, PassSalt, DisplayName) values ('Admin', 'Es7WVgNsJuELwWK8daCqufUBknCsSC0IYDphQZAiGOo=', 'W5vpBEOYRGHkQXatN0t+ECM/U8cHDuEgrq56+zZBk4J481xH', 'Administrator')
GO

SET IDENTITY_INSERT [dbo].[Dicts] ON 
INSERT [dbo].[Dicts] ([ID], [Category], [Name], [Code]) VALUES (1, N'菜单', N'系统菜单', '0')
INSERT [dbo].[Dicts] ([ID], [Category], [Name], [Code]) VALUES (2, N'菜单', N'外部菜单', '1')
SET IDENTITY_INSERT [dbo].[Dicts] OFF

SET IDENTITY_INSERT [dbo].[Navigations] ON 
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (1, 0, N'菜单管理', 10, N'fa fa-dashboard', N'~/Admin/Menus', N'0')
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (2, 0, N'用户管理', 20, N'fa fa-user', N'~/Admin/Users', N'0')
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (3, 0, N'角色管理', 30, N'fa fa-sitemap', N'~/Admin/Roles', N'0')
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (4, 0, N'部门管理', 40, N'fa fa-home', N'~/Admin/Groups', N'0')
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (5, 0, N'字典表维护', 50, N'fa fa-book', N'~/Admin/Dicts', N'0')
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (6, 0, N'个性化维护', 60, N'fa fa-pencil', N'~/Admin/Profiles', N'0')
INSERT [dbo].[Navigations] ([ID], [ParentId], [Name], [Order], [Icon], [Url], [Category]) VALUES (7, 0, N'系统日志', 70, N'fa fa-gears', N'~/Admin/Logs', N'0')
SET IDENTITY_INSERT [dbo].[Navigations] OFF
