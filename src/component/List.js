const links = {
    Admin:[
        {label:"Dashbord",path:'/dashbord', icon:'dashboard'},
        {label:"Staff List",path:'/staffList', icon:'list'},
        {label:"Customer List",path:'/customerList', icon:'list'},
        {label:"Customer Application",path:'/view-application', icon:'file-alt'},
        // {label:"Approved Application",path:'/approved', icon:'list'},
        {label:"Payment",path:'/payment', icon:'money-bill'},
        {label:"User Account",path:'/userAccount', icon:'cog'},
        {label:"Report", path:'/report', icon:'money-bill'},
    ],
    Staff:[

        {label:'Dashboard', path:'/staffdash', icon:'dashboard'},
        {label:"Customer List",path:'/customerLists', icon:'list'},
        {label:"Customer Application",path:'/view-applications', icon:'file-alt'},
        // {label:"Approved Application",path:'/approvedApp', icon:'list'},
        {label:"Payment", path:'/payments', icon:'money-bill'},
        {label:"Report", path:'/reports', icon:'money-bill'},

    ],
    Customer:[
        {label:"Dashbord",path:'/customeDashbord', icon:'dashboard'},
        {label:"Application",path:'/CustApplicationList', icon:'list'},
        {label:"Payment",path:'/customePayment', icon:'money-bill'},
        {label:"Proiflle",path:'/customeProfile', icon:'money-profile'},
        {label:"Report", path:'/customerReport', icon:'money-bill'},
    ]
}
export default links;