Ext.define('DinoKale.view.Map', {
    extend: 'Ext.Panel',
    xtype: 'mappanel',
    requires: [
        'Ext.Map'
    ],

    config: {
        title:'Map',
        iconCls: 'maps',

        scrollable: true,
        styleHtmlContent: true,

    
        items: [
            {
               xtype: 'map'
            }
        ]
    }
});



