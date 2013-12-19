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

        Ext.Viewport.add(Ext.create('Ext.Map'));

    }
});



