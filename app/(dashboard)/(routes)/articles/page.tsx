import ArticleList from "@/components/ArticleList";
import { db } from "@/lib/db";

const  ArticlesPage = async () => {
    const articles = await db.article.findMany()
    return (
        <div className="p-6">
            <ArticleList items={articles}/>
        </div>
    );
}

export default ArticlesPage;
