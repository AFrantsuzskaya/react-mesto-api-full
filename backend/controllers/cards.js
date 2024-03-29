const Cards = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Cards.find({}).sort({createdAt: 'desc'})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError('Не достаточно прав на удаление карточки'));
      }
      return card.remove()
        .then(() => res.send({ meesage: 'Карточка удалена' }))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  console.log(req.params.cardId)
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch(next);
};
