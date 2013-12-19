Ext.define('DinoKale.view.Map', {
    extend: 'Ext.Panel',
    xtype: 'mappanel',

    config: {
        title:'Map',
        iconCls: 'map'

        html: [
               '<img src="http://staging.sencha.com/img/sencha.png" />',
               '<h1>Welcome to Sencha Touch</h1>',
               "<p>This will eventually be a map page. ",
               "for a simple app</p>",
               '<h2>DinoKale (0.0.1)</h2>'
               ].join("")
    }
});



