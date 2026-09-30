import TabbedPanel from "../TabbedPanel"

export default function renderTabPanel(tabs, defaultTab){
    return (
        <TabbedPanel tabs={tabs} defaultTab={defaultTab}/>
    );
}