const Article = require('../models/Article');

// 获取所有文章
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .sort({ createdAt: -1 }); // 按创建时间降序
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 获取单个文章
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: '文章不存在' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 创建文章
exports.createArticle = async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            summary: req.body.summary,
            tags: req.body.tags,
            category: req.body.category,
            coverImage: req.body.coverImage,
            published: req.body.published
        });
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 更新文章
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: '文章不存在' });
        }

        Object.assign(article, req.body);
        article.updatedAt = Date.now();
        
        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 删除文章
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: '文章不存在' });
        }
        await article.remove();
        res.json({ message: '文章已删除' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
