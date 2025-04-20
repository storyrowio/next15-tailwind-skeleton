import PageTitle from "components/ui/PageTitle";
import Breadcrumb from "components/ui/breadcrumbs/Breadcrumb";
import KanbanBoardOld from "components/pages/task/KanbanBoardOld";
import {KanbanBoard} from "components/pages/task/KanbanBoard";

export default function Tasks() {
    return (
        <div>
            <PageTitle title="List of Posts">
                <Breadcrumb
                    items={[
                        {title: 'Home', href: '/app'},
                        {title: 'Post'},
                    ]}/>
            </PageTitle>
            <KanbanBoard/>
        </div>
    )
}
