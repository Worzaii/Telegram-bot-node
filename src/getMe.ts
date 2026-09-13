import {Api} from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const api = new Api(process.env.BOT_TOKEN!);
const me = await api.getMe();
console.dir(me);
await api.sendMessage({
    chat_id: 129430675,
    text:
`I ran getMe to the API
    
My ID is: ${me.id}
My firstname is: ${me.first_name} 
My Username is: ${me.username}
Can I join groups: ${me.can_join_groups}
Can I read all group messages: ${me.can_read_all_group_messages}
Accept inline queries: ${me.supports_inline_queries}
supports_guest_queries: ${me.supports_guest_queries}
can_connect_to_business: ${me.can_connect_to_business}
has_main_web_app: ${me.has_main_web_app}
has_topics_enabled: ${me.has_topics_enabled}
allows_users_to_create_topics: ${me.allows_users_to_create_topics}
can_manage_bots: ${me.can_manage_bots}
supports_join_request_queries: ${me.supports_join_request_queries}

That's all the settings summarized.`
});
// the same client is also on bot.api and ctx.api