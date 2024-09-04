module dev_address::sharetos{
    use std::signer;
    use std::vector;
    use std::simple_map::{Self, SimpleMap};
    use std::string::{String};

    struct IdeasAggregator has key {
        admins: vector<address>,
        ideas: SimpleMap<String, u64>,
    }

    fun init_module(owner: &signer) {
        let admin_arr = vector::empty<address>();
        let addr = signer::address_of(owner);
        vector::push_back(&mut admin_arr, addr);
        move_to(owner, IdeasAggregator { admins:  admin_arr,
            ideas: simple_map::create(),
        })
    }

    public entry fun add_idea(idea_id: String, owner: address) acquires IdeasAggregator {
        let ideaAggregator = borrow_global_mut<IdeasAggregator>(owner);
        simple_map::add(&mut ideaAggregator.ideas, idea_id, 0);
    }

    public entry fun upvote_defi(idea_id: String, owner: address) acquires IdeasAggregator {
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        let vote_count = simple_map::borrow_mut(&mut ide.ideas, &idea_id);
        *vote_count = *vote_count + 1;
    }

    public entry fun remove_idea(signer: &signer, idea_id: String, owner: address) acquires IdeasAggregator {
        let addr = signer::address_of(signer);
        let ide = borrow_global_mut<IdeasAggregator>(owner);
        assert!(vector::contains(&ide.admins, &addr), 1);
        simple_map::remove(&mut ide.ideas, &idea_id);
    }

    #[view]
    public fun get_all_ideas(owner:address):(vector<address>, SimpleMap<String, u64>) acquires IdeasAggregator{
        let ide = borrow_global<IdeasAggregator>(owner);
        return (ide.admins, ide.ideas)
    }
}