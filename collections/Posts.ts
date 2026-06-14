import type { CollectionConfig } from "payload";

const formatSlug = (val: string): string =>
  val
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w\-]+/g, "")
    .toLowerCase();

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "category", "publishedDate"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Post Content",
          description: "Write your main blog post content and details here.",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              admin: {
                placeholder: "Enter a catchy post title...",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              admin: {
                placeholder: "Write a short summary or teaser for the card listing...",
              },
            },
            {
              name: "content",
              type: "richText",
              required: true,
            },
          ],
        },
        {
          label: "Media & Categorization",
          description: "Upload images, assign categories, authors, and tag keywords.",
          fields: [
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "category",
              type: "relationship",
              relationTo: "categories",
              required: true,
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "users",
              required: true,
            },
            {
              name: "tags",
              type: "array",
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: "tag",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    // Sidebar fields (Publishing, Status, Slug, and SEO overrides)
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        description: "Auto-generated from title if left blank",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return formatSlug(value);
            if (data?.title) return formatSlug(data.title);
            return value;
          },
        ],
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "seoTitle",
      type: "text",
      admin: {
        position: "sidebar",
        placeholder: "Override meta title...",
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      admin: {
        position: "sidebar",
        placeholder: "Override meta description...",
      },
    },
  ],
};
