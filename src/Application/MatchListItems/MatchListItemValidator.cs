using Application.Common.Models;
using FluentValidation;

namespace Application.Common.Validators
{
    public class MatchListItemValidator : AbstractValidator<MatchListItem>
    {
        public MatchListItemValidator()
        {
            RuleFor(match => match.Id)
            .NotEmpty()
            .NotNull()
            .MaximumLength(80);

            RuleFor(match => match.Url)
               .NotEmpty()
               .NotNull()
               .MaximumLength(80);

            RuleFor(match => match.Name)
                .NotEmpty()
                .NotNull()
                .MaximumLength(80);

            RuleFor(match => match.Password)
                .MaximumLength(80);
        }
    }
}
