import { User } from "./user";
export interface Item {
    type_of: string
    id: number
    title: string
    description: string
    readable_publish_date: string
    slug: string
    path: string
    url: string
    comments_count: number
    public_reactions_count: number
    collection_id: any
    published_timestamp: string
    positive_reactions_count: number
    cover_image: any
    social_image: string
    canonical_url: string
    created_at: string
    edited_at: any
    crossposted_at: any
    published_at: string
    last_comment_at: string
    reading_time_minutes: number
    tag_list: any[]
    tags: string
    user: User
}
