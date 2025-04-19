'use client'

import PageTitle from "components/ui/PageTitle";
import Breadcrumb from "components/ui/breadcrumbs/Breadcrumb";
import Card from "components/ui/card/Card";
import Editor from "components/ui/form/Editor/Editor";
import CardHeader from "components/ui/card/CardHeader";
import CardContent from "components/ui/card/CardContent";

export default function Post() {
    return (
        <div>
            <PageTitle title="List of Posts">
                <Breadcrumb
                    items={[
                        {title: 'Home', href: '/app' },
                        {title: 'Post' },
                    ]}/>
            </PageTitle>
            <Card>
                <CardHeader>

                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    )
}
