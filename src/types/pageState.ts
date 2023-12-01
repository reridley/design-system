import { Timer } from './timers';

export interface Message {
    message: string;
    message_tags: string[];
}

export enum TimersEnum {
    Activity = 'activity',
    Buff = 'buff',
    Campaign = 'campaign',
    CharacterCooldown = 'character-cooldown',
    CloneGestation = 'clone-gestation',
    Confined = 'confined',
    GlobalMessage = 'global-message',
    HotelRoom = 'hotel-room',
    Mission = 'mission',
    ShipCooldown = 'ship-cooldown',
    ShipTravel = 'ship-travel',
    ShuttleTicket = 'shuttle-ticket',
    SpecialEvent = 'special-event',
    SyndicateCampaign = 'syndicate-campaign',
    SyndicateCooldown = 'syndicate-cooldown',
    Unconscious = 'unconscious',
    Course = 'course',
}

export interface PageState {
    messages: Message[];
    timers: Timer[];
}
