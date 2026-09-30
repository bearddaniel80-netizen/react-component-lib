import TabPage from "../TabPage";

export default function renderTabPage(items, page, onToggle){
    return (
        <TabPage items={items} page={page} onToggle={onToggle} />
    );
}