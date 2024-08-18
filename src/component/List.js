const links = {
    Admin:[
        {label:"Dashbord",path:'/dashbord', icon:'dashboard'},
        {label:"Staff List",path:'/staffList', icon:'list'},
        {label:"Customer List",path:'/customerList', icon:'list'},
        {label:"Customer Application",path:'/view-application', icon:'file-alt'},
        // {label:"Approved Application",path:'/approved', icon:'list'},
        {label:"Payment",path:'/payment', icon:'money-bill'},
        {label:"User Account",path:'/accountSetting', icon:'cog'},
    ],
    Staff:[

        {label:'Dashboard', path:'/staffdash', icon:'dashboard'},
        {label:"Customer List",path:'/customerList', icon:'list'},
        {label:"Customer Application",path:'/view-application', icon:'file-alt'},
        // {label:"Approved Application",path:'/approvedApp', icon:'list'},
        {label:"Payment", path:'/payment', icon:'money-bill'},

    ],
    Customer:[
        {label:"Dashbord",path:'/customeDashbord', icon:'dashboard'},
        {label:"Application",path:'/CustApplicationList', icon:'list'},
        {label:"Payment",path:'/customePayment', icon:'money-bill'},
        {label:"Proiflle",path:'/customeProfile', icon:'money-profile'},
    ]
}
export default links;