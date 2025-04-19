'use client'

import Editor from "components/ui/form/Editor/Editor";
import PageTitle from "components/ui/PageTitle";
import Breadcrumb from "components/ui/breadcrumbs/Breadcrumb";
import Card from "components/ui/card/Card";

export default function CreatePost() {
    return (
        <div>
            <PageTitle title="Create Post">
                <Breadcrumb
                    items={[
                        { title: 'Home', href: '/app' },
                        { title: 'Post', href: '/app/post' },
                        { title: 'Create Post' },
                    ]}/>
            </PageTitle>
            <Card>
                <Editor onChange={(val) => console.log(val)}/>
            </Card>
        </div>
    )
}
