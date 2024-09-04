module dev_address::sharetos{
    use std::signer;
    use std::vector;
    use std::simple_map::{Self, SimpleMap};
    use std::string::{String, utf8};

    struct IdeasAggregator has key {
        admins: vector<address>,
        payment: SimpleMap<String, u64>,
        consumer_dapp: SimpleMap<String, u64>,
        nft: SimpleMap<String, u64>,
        defi: SimpleMap<String, u64>,
        depin: SimpleMap<String, u64>,
        gaming: SimpleMap<String, u64>,
        social: SimpleMap<String, u64>,
        ai: SimpleMap<String, u64>,
        content: SimpleMap<String, u64>,
        developer_tooling: SimpleMap<String, u64>,
        community: SimpleMap<String, u64>
    }

    fun init_module(owner: &signer) {
        let admin_arr = vector::empty<address>();
        let addr = signer::address_of(owner);
        vector::push_back(&mut admin_arr, addr);
        move_to(owner, IdeasAggregator { admins:  admin_arr,
            payment: simple_map::create(),
            consumer_dapp: simple_map::create(),
            nft: simple_map::create(),
            defi: simple_map::create(),
            depin: simple_map::create(),
            gaming: simple_map::create(),
            social: simple_map::create(),
            ai: simple_map::create(),
            content: simple_map::create(),
            developer_tooling: simple_map::create(),
            community: simple_map::create(),
        })
    }



    // Add functions for `defi`
    public entry fun add_defi_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.defi, idea_id, 0);
    }

    public entry fun upvote_defi(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let defi_count = simple_map::borrow_mut(&mut ide.defi, &idea_id);
        *defi_count = *defi_count + 1;
    }

    public entry fun remove_defi_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.defi, &idea_id);
    }

    // Add functions for `payment`
    public entry fun add_payment_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.payment, idea_id, 0);
    }

    public entry fun upvote_payment(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let payment_count = simple_map::borrow_mut(&mut ide.payment, &idea_id);
        *payment_count = *payment_count + 1;
    }

    public entry fun remove_payment_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.payment, &idea_id);
    }

    // Add functions for `consumer_dapp`
    public entry fun add_consumer_dapp_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.consumer_dapp, idea_id, 0);
    }

    public entry fun upvote_consumer_dapp(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let consumer_dapp_count = simple_map::borrow_mut(&mut ide.consumer_dapp, &idea_id);
        *consumer_dapp_count = *consumer_dapp_count + 1;
    }

    public entry fun remove_consumer_dapp_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.consumer_dapp, &idea_id);
    }

    // Add functions for `nft`
    public entry fun add_nft_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.nft, idea_id, 0);
    }

    public entry fun upvote_nft(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let nft_count = simple_map::borrow_mut(&mut ide.nft, &idea_id);
        *nft_count = *nft_count + 1;
    }

    public entry fun remove_nft_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.nft, &idea_id);
    }


    // Add functions for `dePin`
    public entry fun add_depin_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.depin, idea_id, 0);
    }

    public entry fun upvote_depin(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let depin_count = simple_map::borrow_mut(&mut ide.depin, &idea_id);
        *depin_count = *depin_count + 1;
    }

    public entry fun remove_depin_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.depin, &idea_id);
    }

    // Add functions for `gaming`
    public entry fun add_gaming_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.gaming, idea_id, 0);
    }

    public entry fun upvote_gaming(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let gaming_count = simple_map::borrow_mut(&mut ide.gaming, &idea_id);
        *gaming_count = *gaming_count + 1;
    }

    public entry fun remove_gaming_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.gaming, &idea_id);
    }

    // Add functions for `social`
    public entry fun add_social_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.social, idea_id, 0);
    }

    public entry fun upvote_social(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let social_count = simple_map::borrow_mut(&mut ide.social, &idea_id);
        *social_count = *social_count + 1;
    }

    public entry fun remove_social_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.social, &idea_id);
    }

    // Add functions for `ai`
    public entry fun add_ai_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.ai, idea_id, 0);
    }

    public entry fun upvote_ai(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let ai_count = simple_map::borrow_mut(&mut ide.ai, &idea_id);
        *ai_count = *ai_count + 1;
    }

    public entry fun remove_ai_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.ai, &idea_id);
    }

    public entry fun add_content_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.content, idea_id, 0);
    }

    public entry fun upvote_content(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let content_count = simple_map::borrow_mut(&mut ide.content, &idea_id);
        *content_count = *content_count + 1;
    }

    public entry fun remove_content_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(& ide.admins, &addr), 1);
        simple_map::remove(&mut ide.content, &idea_id);
    }

    public entry fun add_dev_tooling_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.developer_tooling, idea_id, 0);
    }

    public entry fun upvote_dev_tooling(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let dev_tooling_count = simple_map::borrow_mut(&mut ide.developer_tooling, &idea_id);
        *dev_tooling_count = *dev_tooling_count + 1;
    }

    public entry fun remove_dev_tooling_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(& ide.admins, &addr), 1);
        simple_map::remove(&mut ide.developer_tooling, &idea_id);
    }

    public entry fun add_community_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.community, idea_id, 0);
    }

    public entry fun upvote_community(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let community_count = simple_map::borrow_mut(&mut ide.community, &idea_id);
        *community_count = *community_count + 1;
    }

    public entry fun remove_community_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(& ide.admins, &addr), 1);
        simple_map::remove(&mut ide.community, &idea_id);
    }

    #[view]
    public fun get_all_ideas(owner:address):(vector<address>, SimpleMap<String, SimpleMap<String, u64>>) acquires IdeasAggregator{
        let ide = borrow_global<IdeasAggregator>(owner);
        let category_map = simple_map::create<String, SimpleMap<String, u64>>();
        simple_map::add(&mut category_map, utf8(b"payment"), ide.payment);
        simple_map::add(&mut category_map, utf8(b"consumer_dapp"), ide.consumer_dapp);
        simple_map::add(&mut category_map, utf8(b"defi"), ide.defi);
        simple_map::add(&mut category_map, utf8(b"nft"), ide.nft);
        simple_map::add(&mut category_map, utf8(b"depin"), ide.depin);
        simple_map::add(&mut category_map, utf8(b"gaming"), ide.gaming);
        simple_map::add(&mut category_map, utf8(b"social"), ide.social);
        simple_map::add(&mut category_map, utf8(b"ai"), ide.ai);
        simple_map::add(&mut category_map, utf8(b"content"), ide.content);
        simple_map::add(&mut category_map, utf8(b"developer_tooling"), ide.developer_tooling);
        simple_map::add(&mut category_map, utf8(b"community"), ide.community);
        return (ide.admins, category_map)
    }

}