export interface IClient {
    client_name: string;
    avatar?: string;
    email: string;
    services: string[];
    returning_client: boolean;
    client_id: string;
    identification_id: string;
    created_at: string;
}