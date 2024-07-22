export interface ResponseType{
    success: boolean;
    data?: any;
    message?: string;
}

export interface BlogPostCardType{
    id: number;
    title: string;
    except: string;
    content: string;
    createdAt: string;
}
export interface UserType {
    id: number;
    name: string;
    email: string;
  }