import { NameSlug } from './common';

export interface MissionMessages {
    location?: string;
    message: string;
    npc_slug?: string;
    speaker?: string;
    subtype?: 'action' | 'phrase';
    type: 'action' | 'campaign' | 'do' | 'job' | 'mech' | 'milestone' | 'mission' | 'notify' | 'player' | 'say';
}

export interface NextSteps {
    action_label: string;
    available: boolean;
    unavailable_reason?: string;
    url: string;
    url_parameters: Record<string, unknown>;
    step_slug: string;
}

export interface NPCTarget {
    name: string;
    slug: string;
}

interface SocialAction {
    action_group: 'social';
    label: string;
    link: string;
}

export enum MissionTypeEnum {
    CoreMission = 'core',
    DiscreetWork = 'discreet-work',
    Job = 'job',
    Mission = 'mission',
}

export interface CurrentMission {
    attempt_id: number;
    attempt_success?: boolean;
    attempt_time: number;
    base_seen_url: string;
    current_message: number;
    current_step: {
        description: string;
        step_slug: string;
    };
    mission_messages: MissionMessages[];
    mission_name: string;
    mission_slug: string;
    mission_status: 'active' | 'success' | 'failure';
    mission_type: MissionTypeEnum;
    next_steps: NextSteps[];
    npc_targets: NPCTarget[];
    slide_count: number;
}

export interface NewMission {
    attempt_id: number;
    available: boolean;
    description: string;
    mission_name: string;
    mission_slug: string;
    mission_status: 'obtainable';
    mission_title: string;
    mission_type: MissionTypeEnum;
    has_been_seen: boolean;
    unavailable_reason?: string;
    url: string;
    url_parameters: Record<string, unknown>;
}

export interface CharacterDetailsState {
    age: number;
    admin_character_details?: string;
    birthday: string;
    'character-avatar': {
        description: string;
        image_uri: string;
        large_square_image_uri: string;
        name: string;
        slug: string;
        square_image_uri: string;
    };
    'character-description'?: string;
    character_type: 'npc' | 'pc' | 'self';
    contact_type?: {
        name: string;
        slug: string;
    };
    content_type: 'pc' | 'npc' | 'profile';
    current_mission?: CurrentMission;
    equipped_with?: string;
    full_name: string;
    genotype: {
        name: string;
        slug: string;
    };
    name: string;
    new_mission?: NewMission;
    slug: string;
    social_actions?: SocialAction[];
    syndicate?: {
        name: string;
        slug: string;
        tag: string;
    };
}

export interface Avatar extends NameSlug {
    description: string;
    image_uri: string;
    large_square_image_uri: string;
    square_image_uri: string;
}
