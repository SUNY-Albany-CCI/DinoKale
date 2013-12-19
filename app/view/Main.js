Ext.define('DinoKale.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
               xtype: 'homepanel'
            },
            {
               xtype: 'mappanel'
            },
            {
               xtype: 'searchpanel'
            }
        ]
    }
});
