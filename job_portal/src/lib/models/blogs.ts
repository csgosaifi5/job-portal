import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from "../dbconnection";

interface BlogAttributes {
  blog_id: number;
  title: string;
  description: string;
  image: string;
  banner_title: string;
  banner_image: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  tags: string;
  slug: string;
}

interface BlogCreationAttributes extends Optional<BlogAttributes, 'blog_id'> {}

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public blog_id!: number;
  public title!: string;
  public description!: string;
  public image!: string;
  public banner_title!: string;
  public banner_image!: string;
  public meta_description!: string;
  public meta_keywords!: string;
  public meta_title!: string;
  public tags!: string;
  public slug!: string;
}

Blog.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    banner_title: {
      type: DataTypes.STRING,
    },
    banner_image: {
      type: DataTypes.STRING,
    },
    meta_description: {
      type: DataTypes.STRING,
    },
    meta_keywords: {
      type: DataTypes.STRING,
    },
    meta_title: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'jp_blogs',
  }
);

export default Blog;
