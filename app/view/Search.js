Ext.define('DinoKale.view.Search', {
    extend: 'Ext.Panel',
    xtype: 'searchpanel',

    config: {
        title:'Search',
        iconCls: 'search',

        scrollable: true,
        styleHtmlContent: true,

        html: [
               '<img src="http://staging.sencha.com/img/sencha.png" />',
               '<h1>Welcome to Sencha Touch</h1>',
               "<p>This will be the search page ",
               "for the smple app</p>",
               '<h2>Sencha Touch (2.0.0)</h2>'
               ].join("")
    }
});



