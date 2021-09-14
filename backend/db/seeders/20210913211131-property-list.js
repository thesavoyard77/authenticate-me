'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Properties', [
        { name: 'Bear Manor', address: '42525 Pegasus Way Big Bear Lake, CA 92315 ', userId: 2, description: "A high end log cabin located in the Fox Farm area, with stunning views", price: 450.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Brown Bear Lodge', address: '1108 MOUND STREET, BIG BEAR CITY, CA 92314', userId: 4, description: "A bueatiful log cabin with stunning views. Located in the San Bernardino National Forest", price: 750.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Fake Log Bear Trap', address: '430 Vista Lane Sugarloaf, CA 92386 ', userId: 2, description: "A small shack with fake logs nailed to the outside, far from all the entertainment yet will still cost you an arm and a leg!", price: 250.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Isolated Bear Lodge', address: '39 Lakeview Tract Fawnskin, CA 92333  ', userId: 3, description: "A classic Big Bear cabin, nothing fancy but it offers seclusion and resonable rates!", price: 150.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Tacky Bear', address: '218 AVON COURT, BIG BEAR LAKE, CA 92315  ', userId: 3, description: "Absolute proof that oney can't buy good taste, rent this one if you like leopard print spanedex", price: 525.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Cheap Bear', address: '39954 Lakeview Drive Big Bear Lake, CA 92315', userId: 4, description: "A perfecttly located cabin on the lake. With a stunning yard and a cassic interior, the interior is badly in need of updating. You can see how cheap the owner is", price: 425.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Bear Log Castle', address: '663 Cove Drive Big Bear Lake, CA 92315', userId: 4, description: "Prepare to sell you children for this lovely getaway! This multi-million dollar log castle is absolutely not defensable. Better hope nothing goes south while you're staying here or you'll be a sitting duck!", price: 1170.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Generic Bear Lodge', address: '40375 Big Bear Blvd, Big Bear Lake, CA 92315', userId: 3, description: "This cabin truely lives up to it's name. With all materials purchsed at Home Depot for the renovation, you can feel like you're in a cheap suburban apartment with wood accents!", price: 170.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Ugly Bear Hideaway', address: '41121 Big Bear BLVD, Big Bear Lake, 92315', userId: 2, description: "This style of cabin is called a gambrel, someone once thought that was a good idea.", price: 120.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Tiny Bear Lakefront Shack', address: '806 Penninsula Lane Big Bear Lake, CA 92315 ', userId: 4, description: "This cabin is tiny and not so tastefully decorated. But it has lots of style and a perfect location!", price: 350.00, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Septagonal Bear Manor', address: '1098 Mt Verdi Road Big Bear City, CA 92314 ', userId: 2, description: "The odd shape of the building gives every room in this building an akward shape, it's not just the exterior!", price: 350.00, createdAt: new Date(), updatedAt: new Date()}
      ], {});

  },

  down: (queryInterface, Sequelize) => {


      return queryInterface.bulkDelete('Properties', null, {});

  }
};
